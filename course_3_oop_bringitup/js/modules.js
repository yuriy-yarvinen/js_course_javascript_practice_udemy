import MainSlider from './modules/slider/slider-main';
import ShowInfo from './modules/showinfo';
import Download from './modules/download';
import VideoPlayer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
    const modulePageSlider = new MainSlider({container: '.moduleapp', btns: '.next'});
    modulePageSlider.render();

    new VideoPlayer('.module__video-item .play', '.overlay').init();
    new ShowInfo('.plus__content').init();

    new Download('.download').init();
});