
include_directories ("${PROJECT_SOURCE_DIR}/imgui")
include_directories ("${PROJECT_SOURCE_DIR}/imgui-node-editor")

include_directories("./utilities")

add_executable(node-editor main.cpp utilities/builders.cpp utilities/drawing.cpp utilities/widgets.cpp)

target_link_libraries(node-editor
	imgui
	imgui-node-editor
	${OPENGL_LIBRARY}
	${GL_LIBS}
)

if (${CMAKE_SYSTEM_NAME} MATCHES "Emscripten")
	add_definitions(-DEMSCRIPTEN)
	set(CMAKE_EXECUTABLE_SUFFIX ".html")
    set_target_properties(node-editor PROPERTIES LINK_FLAGS "--emrun   -s WASM=1 -std=c++11 -s DISABLE_EXCEPTION_CATCHING=0 -s ALLOW_MEMORY_GROWTH=1 -s USE_WEBGL2=1 -s FULL_ES3=1 -s USE_GLFW=3 -s FETCH=1")
endif ()