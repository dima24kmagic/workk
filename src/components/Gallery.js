import React, {Component} from 'react';


/*
 let typingTimer;
 let doneTypingInterval = 5000;
 onChange{
  clearTimeout(typingTimer)
  typingTimer = setTimeout(doneTyping(), doneTypingInterval);
 }
*/




//Components
import PreLoader from './Preloader';

let typingTimer;
let doneTypingInterval = 700;
let previousInput = "";
class Gallery extends Component{
  /*
    Our setTimeout function executed when input don't recieve onChange method,
    if it does - we clearTimeout before function is executed
  */
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      images: {}
    }
  }
  startSearch = (e) =>{
    let eventValue = e.target.value;
    if(eventValue.slice(-1) == " "){
      console.log('SPACE IS PRESSED');
    }
    if(eventValue.slice(-1) !== " " && eventValue.slice(-1) !== ""){
      this.setState({loading:true})
      clearTimeout(typingTimer);
      typingTimer = setTimeout(function(){
        console.log(eventValue);
        search(eventValue);
      }, doneTypingInterval);
    }
    let search = (e) => {
      this.props.onSearch(e)
    }
    if(e.target.value == ""){
      this.setState({loading:false})
    }
  }
  render(){
    return(
      <div className="gallery-layout">
        <div className="search-form">
          <form className="search-form__form" onChange={(e)=>this.startSearch(e)} onSubmit={(e)=>this.props.onSearch(e)}>
          <h1 className="search-form__heading">Search For</h1>
          <input type="text" placeholder="Funny Cat's" className="search-form__input"/>
          </form>
        </div>
        <div className="row gal justify-content-center">
          {
            (this.state.loading)
            ? <PreLoader/>
            : ""
          }
          {
            this.props.getStoreState('images').map((image, i) => {
              // console.log(111);
              return(
                <div className="col-12 col-sm-6 col-lg-4 gal__container" key={i}>
                  <img className={"d-"+this.state.imgDisplay+" gal__pic"} src={image.url} alt={image.title}
                    onLoad={()=>{
                      if(i+1 == this.props.getStoreState('images').length){
                        this.setState({loading: false})
                      }
                    }}></img>
                </div>
              )
            })
          }
        </div>
        <div className="u-center-text mt-4"><div className="btn btn--green">Show More</div></div>
      </div>
    )
  }
}

export default Gallery;
