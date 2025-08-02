rootProject.name = "devflow-backend"

include(
    "devflow-common",
    "devflow-domain",
    "devflow-infrastructure",
    "devflow-application",
    "devflow-interfaces"
)

pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}