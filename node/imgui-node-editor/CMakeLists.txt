
include_directories ("${PROJECT_SOURCE_DIR}/imgui")
set( SRC crude_json.cpp imgui_canvas.cpp imgui_node_editor_api.cpp imgui_node_editor.cpp)
set( HEAD ScopeGuard.h stb_image.h crude_json.h imgui_bezier_math.h imgui_bezier_math.inl imgui_canvas.h imgui_extra_math.h imgui_extra_math.inl imgui_node_editor_internal.h imgui_node_editor_internal.inl imgui_node_editor.h)
add_library(imgui-node-editor ${SRC} ${HEAD} )
