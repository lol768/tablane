function addStatusColors() {
    let colors = [
        'rgb(128, 0, 0)',
        'rgb(229, 0, 0)',
        'rgb(255, 64, 129)',
        'rgb(255, 127, 171)',
        'rgb(249, 0, 234)',
        'rgb(234, 128, 252)',
        'rgb(191, 85, 236)',
        'rgb(155, 89, 182)',
        'rgb(124, 77, 255)',
        'rgb(2, 49, 232)',
        'rgb(129, 177, 255)',
        'rgb(51, 151, 221)',
        'rgb(48, 130, 183)',
        'rgb(4, 169, 244)',
        'rgb(2, 188, 212)',
        'rgb(27, 188, 156)',
        'rgb(46, 205, 111)',
        'rgb(249, 217, 0)',
        'rgb(175, 126, 46)',
        'rgb(255, 120, 0)',
        'rgb(230, 81, 0)',
        'rgb(181, 188, 194)',
        'rgb(102, 118, 132)',
    ];

    for (let i = 0; i < colors.length; i++) {
        let style = document.createElement('style');
        style.innerHTML = `.color${i + 1} { background-color: ${colors[i]}; }`;
        document.querySelector('head').appendChild(style);
    }
}

addStatusColors()

document.querySelectorAll('.dropdown div').forEach(dropdownColor => {
    dropdownColor.addEventListener('click', x => {
        console.dir(x.currentTarget)
        x.currentTarget.parentElement.parentElement.className = `prop ${x.currentTarget.className}`
        x.currentTarget.parentElement.parentElement.children[0].textContent = x.currentTarget.children[0].textContent
    })
})

document.querySelectorAll('.task-footer .prop').forEach(x => {
    x.addEventListener('click', x => {
        let doc = document.createElement('div')
        doc.classList.add('task')
        x.currentTarget.parentElement.parentElement.children[1].append(doc)
    })
})

