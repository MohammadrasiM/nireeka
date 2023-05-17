const scrollTo = (containerSelector, targetSelector) => {
    const targetElement = document.querySelector(targetSelector);
    const containerElement = document.querySelector(containerSelector);
    if (!!containerElement && !!targetElement && !!containerElement.scroll && !targetMethod)
        containerElement.scroll({
            top: targetElement?.offsetTop,
            behavior: 'smooth'
        });
    else if (!!targetElement?.scrollIntoView) targetElement?.scrollIntoView({behavior: 'smooth', block: 'start'});

};

export const scrollToTargetAdjusted = (targetSelector, offset) => {
    const targetElement = document.querySelector(targetSelector);
    const elementPosition = targetElement?.getBoundingClientRect()?.top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

export default scrollTo;