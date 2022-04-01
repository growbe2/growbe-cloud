import { ActionCode, AlarmZone, FieldAlarm, FieldAlarmEvent } from "@growbe2/growbe-pb";
import { expect } from "@loopback/testlab";
import { GrowbeCloudApplication } from "../../application";
import { CloudComponent, watchers } from "../../cloud";
import { GrowbeMainboardBindings } from "../../keys";
import { LogTypeEnum } from "../../models";
import { GrowbeDataSubjectObserver } from "../../observers";
import { GrowbeHardwareAlarmRepository, GrowbeLogsRepository, GrowbeModuleRepository } from "../../repositories";
import { getTopic, GrowbeHardwareAlarmService } from "../../services";
import { MqttListnener } from "../../services/mqtt-listener.service";
import { fieldAlarmValidTHL } from "../fixtures/alarm";
import { setupApplication } from "../fixtures/app";
import { boardId, moduleId } from "../fixtures/data";
import { getMainboardMQTT, MainboardMQTTester } from "../helpers/mainboard-mqtt";

describe('Growbe Hardware alarm', () => {
  let app: GrowbeCloudApplication;

  before('setupApplication', async function () {
    ({app} = await setupApplication(
		CloudComponent,
      	async (portailApp: GrowbeCloudApplication) => {	},
    ));
  });

  after(async () => {
    await app.stop();
  });


  describe('Testing alarm operation', () => {

	let mqttMainboard: MainboardMQTTester;
	let moduleRepo: GrowbeModuleRepository;
	let alarmRepo: GrowbeHardwareAlarmRepository;
	let alarmService: GrowbeHardwareAlarmService;
	let logRepo: GrowbeLogsRepository;


	before(async () => {
		const mqttListner = (await app.get('services.MqttListnener')) as MqttListnener;
		for(const watcher of watchers) {
			mqttListner.addWatcher(watcher);
		}
	});

	beforeEach(async () => {
		mqttMainboard = await getMainboardMQTT(boardId, app);
		alarmService = (await app.get('services.GrowbeHardwareAlarmService') as GrowbeHardwareAlarmService);

		// Create module for alarm
		moduleRepo = await app.getRepository(GrowbeModuleRepository);
		alarmRepo = await app.getRepository(GrowbeHardwareAlarmRepository);
		logRepo = await app.getRepository(GrowbeLogsRepository);

		await moduleRepo.create({
			id: moduleId,
			atIndex: 0,
			connected: true,
			mainboardId: boardId,
			updatedAt: new Date(),
		});
	});

	afterEach(async () => {
		mqttMainboard.clear();
		await moduleRepo.deleteAll();
		await alarmRepo.deleteAll();
		await logRepo.deleteAll();
	});


	it('get alarm when none are created return empty list', async () => {
		const elements = await alarmService.getModuleHardwareAlarms(moduleId);
		
		expect(elements).to.be.Array();
		expect(elements.length).to.eql(0);
	});

	it('create alarm with response from mainboard', async () => {
		const topic = getTopic(boardId, "/board/aAl");
		mqttMainboard.responseAt(topic, (response) => {
			response.action = ActionCode.ADD_ALARM;
			response.status = 0;
			response.msg = '';
		});

		await alarmService.addHardwareAlarm(boardId, fieldAlarmValidTHL)

		const alarm = await alarmRepo.findOne({where: {moduleId}});

		expect(mqttMainboard.receiveTopic[topic]).not.undefined();
		expect(alarm).not.be.undefined();
		expect(alarm?.alarms[fieldAlarmValidTHL.property]).to.not.be.undefined();
	}).timeout(10000);

	it('return error if alarm already exits', async () => {
		await alarmRepo.create({moduleId, alarms: {['airTemperature']: {}}});

		try {
			await alarmService.addHardwareAlarm(boardId, fieldAlarmValidTHL)
		} catch (ex) {
			expect(ex).to.be.Error();
			expect(ex.status).to.eql(409);
			return;
		}

		expect(false).to.eql(true);
	});

	it('dont create if mainboard response with error', async () => {
		const topic = getTopic(boardId, "/board/aAl");
		mqttMainboard.responseAt(topic, (response) => {
			response.action = ActionCode.ADD_ALARM;
			response.status = 409;
			response.msg = 'already exits , sync issue';
		});

		try {
			await alarmService.addHardwareAlarm(boardId, fieldAlarmValidTHL)
		} catch (ex) {
			const item = await alarmRepo.findOne({where: {moduleId}});

			expect(ex).to.be.Error();
			expect(ex.message.status).to.eql(409);
			expect(item).to.not.be.undefined();
			expect(item?.alarms).empty();
			return;
		}

		expect(false).to.eql(true);
	});

	it('allow to edit if already exists', async () => {
		const topic = getTopic(boardId, "/board/uAl");
		mqttMainboard.responseAt(topic, (response) => {
			response.action = ActionCode.SYNC_REQUEST;
			response.status = 0;
			response.msg = '';
		});

		await alarmRepo.create({moduleId, alarms: {['airTemperature']: {}}});

		await alarmService.updateHardwareAlarm(boardId, fieldAlarmValidTHL)

		const alarm = await alarmRepo.findOne({where: {moduleId}});

		expect(mqttMainboard.receiveTopic[topic]).not.undefined();
		expect(alarm).not.be.undefined();
		expect(alarm?.alarms[fieldAlarmValidTHL.property]).to.deepEqual({...fieldAlarmValidTHL});
	}).timeout(10000);

	it('return 404 on edit if not exist', async () => {

		try {
			await alarmService.updateHardwareAlarm(boardId, fieldAlarmValidTHL)
		} catch(ex) {
			const item = await alarmRepo.findOne({where: {moduleId}});

			expect(ex).to.be.Error();
			expect(ex.status).to.eql(404);
			expect(item).to.not.be.undefined();
			expect(item?.alarms).empty();
			return;
		}

		expect(false).to.be.true();
	});

	it('allow to delete if already exists', async () => {
		const topic = getTopic(boardId, "/board/rAl");
		mqttMainboard.responseAt(topic, (response) => {
			response.action = ActionCode.REMOVE_ALARM;
			response.status = 0;
			response.msg = '';
		});

		await alarmRepo.create({moduleId, alarms: {['airTemperature']: {}}});

		await alarmService.removeHardwareAlarm(boardId, fieldAlarmValidTHL)

		const alarm = await alarmRepo.findOne({where: {moduleId}});

		expect(mqttMainboard.receiveTopic[topic]).not.undefined();
		expect(alarm?.alarms).be.empty();

	}).timeout(10000);

	it('return 404 on delete if not exits', async () => {
		try {
			await alarmService.removeHardwareAlarm(boardId, fieldAlarmValidTHL)
		} catch(ex) {
			const item = await alarmRepo.findOne({where: {moduleId}});

			expect(ex).to.be.Error();
			expect(ex.status).to.eql(404);
			expect(item).to.not.be.undefined();
			expect(item?.alarms).empty();
			return;
		}

		expect(false).to.be.true();
	}).timeout(10000);

	it('on alarm event save a log entry', async () => {
		await alarmRepo.create({moduleId, alarms: {['airTemperature']: {}}});

		const event = FieldAlarmEvent.create();
		event.currentValue = 22;
		event.currentZone = AlarmZone.MIDDLE;
		event.moduleId = moduleId;
		event.previousValue = 21;
		event.previousZone = AlarmZone.LOW;
		event.property = "airTemperature";


		await alarmService.onHardwareAlarm(boardId, event);

		const logRepo = await app.getRepository(GrowbeLogsRepository);
		const log = await logRepo.findOne({where: { growbeModuleId: event.moduleId, growbeMainboardId: boardId, type: LogTypeEnum.ALARM }});

		expect(log).to.not.be.undefined();
		expect(log?.newState).to.deepEqual({...event});
	});
  });
});
