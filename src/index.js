
import { Component } from 'react'

import classnames from 'classnames'

// 计算 图片的 数量
let img_count = 0

class ImageBoxView extends Component {

    constructor(props) {
        super(props);

        this.init = this.init.bind(this)
        this.onFetchImg = this.onFetchImg.bind(this)
        this.show = this.show.bind(this)

        this._name = img_count++

        let state = this.init(props)
        this.state = state
    }

    init( props ) {

        let { img , animate = '' , mode = '' , delay = 0 , wait = 0 , width=0, height=0 } = props
        let img_list = []

        if ( typeof img == 'string' && img.length > 0 ){

            let img_item = {
                url: img,
                status: 0,  // 0 no  1: ready
                fade: 0, // 0  1: fade ready
            }

            img_list.push( img_item )

        }else if ( typeof img == 'object' && img.length > 0) {

            img.map( ( item ) => {
                let img_item = {
                    url: item,
                    status: 0,
                    fade: 0
                }
                img_list.push( img_item )
            })

        }

        let state = {
            show: false,
            img_list: img_list,
            animate: animate == 'fade',
            style_mode: mode == 'style',
            delay: parseInt(delay),
            wait: parseInt(wait),

            size: {
                width: parseInt(width),
                height: parseInt(height)
            }
        };

        return state
    }

    show( flag ) {
        this.setState({
            show: flag ? true : false
        })
    }

    componentDidMount() {
        let { delay } = this.state


        if ( delay ) {
            this._timer = setTimeout(() => {
                this.show(1)
            } , delay)
        }else{
            this.show(1)
        }
    }

    componentWillUnmount() {
        this._timer && clearTimeout(this._timer)
    }
    
    componentWillReceiveProps(nextProps) {
        let { img } = nextProps
        if (img != this.state.img_data) {
            let state = this.init(nextProps)
            state.show = true
            this.setState(state)
        }
    }

    onFetchImg( index ) {

        let { img_list = [] , animate = false , style_mode = false } = this.state

        let img_item = img_list[index]
        if ( img_item == undefined ) {
            return
        }

        img_item.status = 1

        if ( style_mode ) {
            img_item.style = {
                backgroundImage:`url(${img_item.url})`,
            }
        }

        if( animate && index > 0 ) {

            let img_ref = 'img_' + index
            let img_dom = this.refs[img_ref] 

            let img_name =  'img_' + this._name + '_' + index

            if( img_dom ) {
                img_dom.addEventListener("webkitTransitionEnd", () => {
                    img_item.fade = 1
                    this.setState({ img_list })
                })
            }

        }else{
            img_item.fade = 1
        }
        this.setState({ img_list })
    }

    onLoadImg( index ) {

        let { wait } = this.state

        if (wait && index > 0 ) {
            // let delay = parseInt(Math.random() * 2000)
            this._timer = setTimeout(()=> {
                this.onFetchImg(index)
            } ,wait)
        }else{
            this.onFetchImg(index)
        }

    }

    render() {

        let { img_list = [] , animate = false , show , size = {} } = this.state

        let is_show_cover = img_list.length == 0

        let first = img_list[0]
        if( first ) {
            is_show_cover = first.fade == 0
        }

        let img_name =  'img_' + this._name


        let { className } = this.props

        let container_cls = classnames({
            'c-img-box' : true,
            [className] : className
        })

        let container_style = {}

        if( size.width ) {
            container_style.width = size.width + 'px';
        }
        if( size.height ) {
            container_style.height = size.height + 'px';
        }

        return (
            <div className={container_cls} style={container_style}  ref="container">
                {
                    is_show_cover && (<div className="img-cover"></div>)
                }
                {
                    show && img_list.map(( item , index ) => {
                        
                        let { url = '' , style = null } = item
                        if( index > 0) {
                            let last = img_list[index-1]
                            // 如果 前面的图 还没加载好 则 不显示
                            if ( last && last.status == 0 ) {
                                return null
                            }
                        }

                        if ( index < img_list.length ) {
                            let next = img_list[index + 1]
                            if( next && next.fade == 1 ) {
                                return null   
                            }
                        }

                        let ref = 'img_' + index

                        let img_cls = classnames({
                            'img-hold' : item.status,
                            'img-hide' : !item.status,
                            'img-animate' : item.status && animate,
                            [ref] : true
                        })

                        let is_show_img_dom = !style
                        return (
                        <div ref={ref} className={img_cls} style={style} onLoad={this.onLoadImg.bind(this , index )}>
                            {
                                is_show_img_dom && <img src={url} />
                            }
                        </div>
                        )
                    }) 
                }
            </div>
        )
    }
}


export default ImageBoxView