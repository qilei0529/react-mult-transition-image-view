# react-mult-transition-image-view

a graceful react component for image display.

----
一个react图片显示组件 [segmentfault 使用说明](https://segmentfault.com/a/1190000011762388)

| 参数 | 描述 | |    
| ------------- |:-------------:| :----- |
| width | 宽度 ( 可选 ) |  会被转换成 style 的 width height  |  
| height | 高度 ( 可选 )  | |
| animate | 动画 ( 可选 )  | 默认: 'none' , 设置 'fade'  会加入 动画 class img-animate 来实现过渡动画) |
| mode | 模式 ( 可选 ) | 默认: style |
| img | 模式 ( 必选 ) | 可以是 url:string , 或者 是 [] 图片列表 |

**图片过渡**
 通过传入 img: [ img_sml , img_big ] ，来实现 图片从低质量 过渡到高质量来 防止大图 加载慢引起的空白。

**注意**
样式可以参考下面的 less 代码


![加载截图](https://raw.githubusercontent.com/qilei0529/react-mult-transition-image-view/edb9aeb4520bac40106cd4cdeab2b72c727181d2/src/shot.gif)


### UPDATE
1.0.5 fix component receive props can not update


----
### Use

    npm install react-mult-transition-image-view

### Sample code

```` react jsx
    
    import ImageBoxView from 'react-mult-transition-image-view'

    <ImageBoxView
        width="320"    // 
        height="200"   // will trans to style
        animate="fade" // animate flag , do not forget add styles at below
        delay="100"    // will delay to load img
        wait="1000"    // will wait between loading img arry
        mode="style"   // display img by 'background-image'
        img={'image-path-url'}   // 1. 'image-path-url' can be string 
                                 // 2. ['image-path', 'hd-image-path']
    />
````



### Style

```` less 
    .c-img-box{
        display:inline-block;
        width: 320px;
        height: 200px;
        background: #f7f6f5;
        position: relative;
        .img-hold{
            overflow: hidden;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            img{
                width:100%;
                height:100%;
            }
            &.img-animate{
                transition: opacity 0.5s;
            }
        }
        
        .img-cover{
            background: url('https://d.2dfire.com/om/images/menulist/7deb58da.default.png') no-repeat center/300px;
            background-color:#f0f0f0;
        }
        
        .img-cover,
        .img-hold,
        .img-hide{
            position: absolute;
            width: 100%;
            height: 100%;
            top:0;
            left:0;
        }
        
        .img-hide{
            opacity: 0;
        }
        
    }
````
