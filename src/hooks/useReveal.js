import { useEffect } from 'react';

function useReveal(key) {
    useEffect(() => {
        let frame = 0;

        const check = () => {
            frame = 0;
            document.querySelectorAll('.reveal:not(.visible)').forEach((item) => {
                if (item.getBoundingClientRect().top < window.innerHeight * 0.9) {
                    item.classList.add('visible');
                }
            });
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(check);
        };

        check();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [key]);
}

export default useReveal;
