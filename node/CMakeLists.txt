# CMakeList.txt : Top-level CMake project file, do global configuration
# and include sub-projects here.
#
cmake_minimum_required (VERSION 3.8)

project ("YASE")

set(CMAKE_CXX_STANDARD 17)

find_package(OpenGL REQUIRED)

set(GLEW_INCLUDE_PATH "" CACHE PATH "The directory that contains GL/glew.h" )
set(GLEW_LIBRARY "" CACHE PATH "libglew.a or glew.lib" )

set(GLFW_INCLUDE_PATH "" CACHE PATH "The directory that contains GLFW/glfw3.h" )
set(GLFW_LIBRARY "" CACHE PATH "The directory that contains glfw3.lib" )

if(UNIX)
	set( GL_LIBS GL GLEW glfw ${BASE_LIBS})
elseif(${CMAKE_SYSTEM_NAME} MATCHES "Emscripten")
	set( GL_LIBS GL GLEW glfw)
else() #windows
	set( GL_LIBS glew32d glfw3)
endif()

include_directories(
	${GLEW_INCLUDE_PATH}
	${GLFW_INCLUDE_PATH}
)

link_directories(
	${GLEW_LIBRARY}
	${GLFW_LIBRARY}
)



# Include sub-projects.
add_subdirectory ("imgui")
add_subdirectory ("imgui-node-editor")
add_subdirectory ("node-editor")