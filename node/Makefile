

lean:
	@rm -rf build/
	@rm -rf build_em
	@rm -rf publish/

build_em:
	@emcmake cmake -Bbuild-em -G "Unix Makefiles" -D OpenGL_GL_PREFERENCE=GLVND
	@cd build-em && emmake make

build_pc:
	@cmake -Bbuild -G "Unix Makefiles"
	@cd build && make

run_em:
	@cd build-em/node-editor && python -m http.server 3000

run:
	./build/node-editor/node-editor

publish:
	@mkdir -p publish
	@cp package.json ./publish/
	@cp build-em/node-editor/node-editor.js build-em/node-editor/node-editor.wasm publish/
	@cd publish && npm publish



