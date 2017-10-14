# react-mult-transition-image-view

a graceful react component for image display.

----

### Use

    npm install react-mult-transition-image-view

### Sample code

```` react jsx
    <ImageBoxView
        width="320"    // 
        height="200"   // will trans to style
        animate="fade" // animate flag , do not forget add styles at below
        delay="100"    // will delay to load img
        wait="1000"    // will wait between loading img arry
        mode="style"   // display img by 'background-image'
        img={'image-path-url'}   // 1. 'image-path-url' can be string , 
                                 // 2. ['image-path', 'hd-image-path']， it will trans from 'image-path' to 'hd-image-path'
    />
````

### Style

```` css 
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
