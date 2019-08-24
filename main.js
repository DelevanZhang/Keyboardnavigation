//1初始化数据
let hashA = init()
let keys = hashA['keys']
let hash = hashA['hash']


//2生成键盘,
createKeyboard(keys,hash)


//初始化
function init(){
    let keys = new Array(
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    )
    let hash = {
        'q': 'qq.com', 'w': 'weibo.com', 'e': 'ele.me', 'r': 'renren.com', 't': 'tianya.com', 'y': 'youtube.com', 'u': 'uc.com' , 'i': 'iqiyi.com', 'o': 'opera.com', 'p': undefined, 'a': 'acfun.tv', 's': 'sohu.com', 'z': 'zhihu.com', 'm': 'www.mcdonalds.com.cn'
    } 
    //取出localStorage中的ZZZ对应的hash
    let hashInLocalStorage = getFromLocalStorage('ZZZ')
    if(hashInLocalStorage){
        hash = hashInLocalStorage
    }
    return {
        'keys':keys,
        'hash':hash
    }
}


//工具函数
//判断localStorage里面有缓存没有
function getFromLocalStorage(Name){
    return JSON.parse(localStorage.getItem('ZZZ') || 'null')
}
//创建Element元素
function createTag(tagName){
    return document.createElement(tagName)
}
//创建span元素包含键盘字母
function createSpan(textContent){
    let span = createTag('span')
    span.textContent = textContent.toLocaleUpperCase()
    span.className = 'text'
    return span;
}
//创建button元素 id就是键盘的字幕对应
function createButton(id){
    let button = createTag('button')
    button.textContent = '编辑'
    button.id = id
    button.onclick = function(event){
        let currentBtn = event.target//用户点击的元素
        var key = currentBtn.id //拿到当前点击的键盘字母
        let webset = prompt('请输入网址 :eg qq.com')
        hash[key] = webset //网址变更
        let img = currentBtn.previousSibling //拿到当前的img
        img.src = `http://${webset}/favicon.ico`
        img.onerror = function(err){
            err.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
        }
        localStorage.setItem('zzz',JSON.stringify(hash))
    }
    return button;
}
//创建img元素
function createImg(domain){
    let img = createTag('img')
    if(domain){
        img.src = `http://${domain}/favicon.ico`
    }else{
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    img.onerror = function(err){
        err.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    return img;
}
//生成键盘
function createKeyboard(keys,hash){
    for(let index= 0;index<keys.length;index++){
        let div = createTag('div')
        div.className = 'row'
        container.appendChild(div)

        let row = keys[index] //分别拿到keys里面的 三个数组
        //遍历row数组将字母的值放进span,然后将button img span放进kbd
        for(let index2 = 0;index2<row.length;index2++){
            //创建span里面包含字母
           let span =  createSpan(row[index2])
            //创建button
            let button = createButton(row[index2])
            //创建img
            let img = createImg(hash[row[index2]])
            //创建kbd
            let kbd  = createTag('kbd')
            //装入kbd
            kbd.appendChild(span)
            kbd.appendChild(img)
            kbd.appendChild(button)

            //装入div中
            div.appendChild(kbd)
        }
        
    }
}
