// Include STD
#include <iostream>

// Import des header de opengl
#ifdef EMSCRIPTEN
#include <emscripten/emscripten.h>
#include <emscripten/fetch.h>
#define GLFW_INCLUDE_ES3
#include <GLFW/glfw3.h>
#include <GLES3/gl3.h>

#define SHADER_VERSION "#version 300 es"

namespace fs = std::filesystem;

#define END_PROGRAM(code) emscripten_force_exit(code)


#include <filesystem>

namespace fs = std::filesystem;

#define END_PROGRAM(code) emscripten_force_exit(code)

#else

#include <filesystem>
#include <GL/glew.h>
#include <GLFW/glfw3.h>

namespace fs = std::filesystem;

#define SHADER_VERSION "#version 430 core"
#define END_PROGRAM(code) printf("End of program goodbye\n"); return

#endif

#include "imgui.h"
#include "imgui_impl_glfw.h"
#include "imgui_impl_opengl3.h"

# define IMGUI_DEFINE_MATH_OPERATORS
# include "imgui_internal.h"
# include "imgui_node_editor.h"

#include <atomic>
#include <future>
#include <queue>
#include <sstream>

using namespace std;


namespace ed = ax::NodeEditor;

static ed::EditorContext* g_Context = nullptr;


void Application_Initialize()
{
    ed::Config config;
    config.SettingsFile = "Simple.json";
    g_Context = ed::CreateEditor(&config);
}

void Application_Finalize()
{
    ed::DestroyEditor(g_Context);
}
void Application_Frame()
{
    auto& io = ImGui::GetIO();

    ImGui::Text("FPS: %.2f (%.2gms)", io.Framerate, io.Framerate ? 1000.0f / io.Framerate : 0.0f);

    ImGui::Separator();

    ed::SetCurrentEditor(g_Context);
    ed::Begin("My Editor", ImVec2(0.0, 0.0f));
    int uniqueId = 1;
    // Start drawing nodes.
    ed::BeginNode(uniqueId++);
        ImGui::Text("Node A");
        ed::BeginPin(uniqueId++, ed::PinKind::Input);
            ImGui::Text("-> In");
        ed::EndPin();
        ImGui::SameLine();
        ed::BeginPin(uniqueId++, ed::PinKind::Output);
            ImGui::Text("Out ->");
        ed::EndPin();
    ed::EndNode();
    ed::End();
    ed::SetCurrentEditor(nullptr);

	//ImGui::ShowMetricsWindow();
}




static void glfw_error_callback(int error, const char* description)
{
	std::cerr << "GLFW Error " << error << " : " << description << std::endl;
}

enum YASECreator_state
{
	HOME_PAGE,
	CREATOR
};
// for string delimiter
vector<string> split(string s, string delimiter) {
	size_t pos_start = 0, pos_end, delim_len = delimiter.length();
	string token;
	vector<string> res;

	while ((pos_end = s.find(delimiter, pos_start)) != string::npos) {
		token = s.substr(pos_start, pos_end - pos_start);
		pos_start = pos_end + delim_len;
		res.push_back(token);
	}

	res.push_back(s.substr(pos_start));
	return res;
}
struct membuf : std::streambuf {
	membuf(char* begin, char* end) {
		this->setg(begin, begin, end);
	}
};

struct my_istream {
	my_istream(const char *ptr, const std::size_t size)
		:cur(ptr)
		, end(ptr + size)
	{}

	std::size_t read(void *ptr, const std::size_t size) {
		if (cur + size > end)
			return 0;

		memcpy(ptr, cur, size);
		cur += size;
		return size;
	}

	char peekch() const { return *cur; }
	char getch() { return *cur++; }
	void ungetch(char) { --cur; }

	const char *cur;
	const char *end;
};

#ifdef EMSCRIPTEN


enum YASEEm_state {
	FETCHING_CONFIG,
	PUSHING_CONFIG,
	PULL_LIST_TEXTURE,
	PULL_LIST_SKYBOX,
	PULL_LIST_LOADED_TEX,
	PULL_LIST_MODEL,
	OVER_FAIL,
	DOWLOAD_TEXTURE,
	DOWLOAD_SKYBOX,
	DOWNLOAD_MODEL
};

static string	em_state[6]{
	"Telechargement de la configuration",
	"Creation nouvelle configuration",
	"Reception des textures",
	"Reception des skybox",
	"Reception des models",
	"Erreur"
};


static std::atomic<bool> download_over = false;
static emscripten_fetch_t* get_fetch;

void downloadSucceeded(emscripten_fetch_t *fetch) {
	printf("Finished downloading %llu bytes from URL %s %d.\n", fetch->numBytes, fetch->url,fetch->status);
	get_fetch = fetch;
	download_over = true;
}

void downloadFailed(emscripten_fetch_t *fetch) {
	printf("Downloading %s failed, HTTP failure status code: %d.\n", fetch->url, fetch->status);
}
#endif

class YASECreator
{
	GLFWwindow*	window;


public:
	bool			 over = false;
	YASECreator() : window(0) {}


	void init()
	{
		glfwSetErrorCallback(glfw_error_callback);
		if (!glfwInit())
		{
			std::cerr << "Erreur initialisation glfw" << std::endl;
			return;
		}
		glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
		glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);

		GLFWwindow*	window = glfwCreateWindow(1600, 900, "TP Ville Procedurale", nullptr, nullptr);
		if (!window)
		{
			glfwTerminate();
			std::cerr << "Erreur creation de la fenetre glfw" << std::endl;
			return;
		}
		glfwMakeContextCurrent(window);
		glfwSwapInterval(1); // vsync

#ifndef EMSCRIPTEN
		int v = glewInit();
#endif

		float z = 1.0f;

		// Setup Dear ImGui context
		IMGUI_CHECKVERSION();
		ImGui::CreateContext();
		ImGuiIO& io = ImGui::GetIO(); (void)io;
		io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard;  // Enable Keyboard Controls

		// Setup Platform/Renderer bindings
		ImGui_ImplGlfw_InitForOpenGL(window, true);
		ImGui_ImplOpenGL3_Init(SHADER_VERSION);

		// Setup Style
		ImGui::StyleColorsDark();

		Application_Initialize();


		bool show_demo_window = true;
		bool show_another_window = false;
		ImVec4 clear_color = ImVec4(0.45f, 0.55f, 0.60f, 1.00f);

		glEnable(GL_DEPTH_TEST);
		glDepthFunc(GL_LEQUAL);
		glDisable(GL_BLEND);
		glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
#ifndef EMSCRIPTEN
		glEnable(GL_TEXTURE_CUBE_MAP_SEAMLESS);
#endif
		glClearColor(0.6f, 0.5f, 0.05f, 1.0f);

		this->window = window;
	}

	void mainLoop()
	{
		ImGuiIO& io = ImGui::GetIO();	
		
		if(glfwWindowShouldClose(window))
		{
			over = true;
			printf("Window shot close bye bye\n");
			END_PROGRAM(EXIT_SUCCESS);
		}
		// Regenere mes nouvelles frame de ImGui
		ImGui_ImplOpenGL3_NewFrame();
		ImGui_ImplGlfw_NewFrame();
		ImGui::NewFrame();

		glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
		// Ma section de rendering


        ImGui::SetNextWindowPos(ImVec2(0, 0));
        ImGui::SetNextWindowSize(io.DisplaySize);
        ImGui::Begin("Content", nullptr,
            ImGuiWindowFlags_NoTitleBar | ImGuiWindowFlags_NoResize | ImGuiWindowFlags_NoMove |
            ImGuiWindowFlags_NoScrollbar | ImGuiWindowFlags_NoScrollWithMouse | ImGuiWindowFlags_NoSavedSettings |
            ImGuiWindowFlags_NoBringToFrontOnFocus);

		Application_Frame();


        ImGui::End();
		
		// Rendering de ImGui par dessus mon stock
		ImGui::Render();
		int display_w, display_h;
		glfwMakeContextCurrent(window);
		glfwGetFramebufferSize(window, &display_w, &display_h);
		glViewport(0, 0, display_w, display_h);
		ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());


		glfwMakeContextCurrent(window);

		glfwSwapBuffers(window);

		glfwPollEvents();

	}


	void shutdown()
	{
		Application_Finalize();
		glfwTerminate();
	}
	
};
YASECreator c;

void run_main()
{
	try {
		c.mainLoop();
	}
	catch (std::exception& e) {
		printf("EX: %s\n", e.what());
	}
}

void run_main_loop()
{
	while(!c.over)
	{
		c.mainLoop();
	}
	printf("End of main loop\n");
}


int main(int argc, char** argv)
{

	printf("Executable name is %s\n",argv[0]);
	c.init();
	

#ifdef EMSCRIPTEN
	emscripten_set_main_loop(run_main, 0,1);
#else
	run_main_loop();
	c.shutdown();
#endif
	return 0;
}
