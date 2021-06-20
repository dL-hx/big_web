/*  function doSomething(part, chapter) {
    const parts = ['ES2016', '工程化','VUE', 'React', 'Node']
    if (part) {
        if (parts.includes(part)) {
            console.log('属于当前课程');
            if (chapter>5) {
                console.log('您需要提供VIP身份');
            }else if (chapter==1) {
        
            }
        }
    } else {
        console.log('请确认模块信息');
    }
    
}

doSomething('ES2016', 6) */

function doSomething(part, chapter) {
    const parts = ['ES2016', '工程化','VUE', 'React', 'Node']
    if (!part) {
        console.log('请确认模块信息');
        return;
    }

    if (!parts.includes(part)) return;
    console.log('属于当前课程');
    if (chapter>5) {
        console.log('您需要提供VIP身份');
    }else if (chapter==1) {
        
    }
    
}

doSomething('ES2016', 6)

// 1.通过提前return 减少判断层级
// 2. if else 的值是固定的  , 使用switch case
// if else 做区间判断