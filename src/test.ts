import { getChannel } from "./scrapper/youtube/getChannel";

(async () => {
    const data = await getChannel("UCe9E4DHzbiLrkGMkkS36phg", {
        isVideo: true,
        api: "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
        token: "4qmFsgKDARIYVUNlOUU0REh6YmlMcmtHTWtrUzM2cGhnGjhFZ1oyYVdSbGIzTVlBeUFBTUFFNEFlb0RGME5uUVZORGQycHhiamxVY25SeWRYWjFjamhDUzBSSpoCLGJyb3dzZS1mZWVkVUNlOUU0REh6YmlMcmtHTWtrUzM2cGhndmlkZW9zMTAy",
    });
    console.log(data);
})();
