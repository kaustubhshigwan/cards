import logo from './logo.svg';
import './App.css';
import { card, useEffect, useState } from 'react'
import { map } from 'async';
import '@progress/kendo-theme-default/dist/all.css';
import { Card } from "@progress/kendo-react-layout";
import { Input } from "@progress/kendo-react-inputs";
import Loader from "react-loader-spinner";
import './components/style.css'
import ReactPaginate from 'react-paginate';
function App() {
  const [state, setState] = useState([])
  const [originalData, changeOGData] = useState([])
  const [info, setInfo] = useState('')
  const [change, setChange] = useState(undefined)
  const [page,setPage]=useState('')
  useEffect(() => { callapi() }, [])

  const callapi = async (info) => {

    fetch(`http://www.reddit.com/search.json?q=${info}&sort=relevance&limit=25`).then((res) => {
      return res.json()
    }).then((data) => {

      console.log(data, 'Show data')
      if (info !== undefined) {
        setState(data.data.children)
        changeOGData(data.data.children)

      }

    }).catch((err) => {
      console.log(err)
    })
  }



  console.log('state  :', state)
  const onchange = (e) => {
    let value = e.target.value
    console.log('e :', e)
    setInfo(value)
    console.log(value)
  }


  function information() {
    let arrCopy = [...originalData];
    let first10 = arrCopy.map((item, index) => index < 10 && item).filter(Boolean);
    setState(first10)
    setPage(1)

  }

  function secPage(){
    let arrCopy = [...originalData];
    let first10 = arrCopy.map((item, index) => ((index > 9 && index < 20) && item)).filter(Boolean);
    setState(first10)
    setPage(2)
  }
  function third(){
    let arrCopy = [...originalData];
    let third = arrCopy.map((item, index) => index > 19 &&  item).filter(Boolean);
    setState(third)
    setPage(3)
  }

  <Loader type="Circles" color="#00BFFF" height={80} width={80} />






  return (

    <div>


      <input value={info} onChange={onchange}
         className="input" />

      <button  className="submit" style={{ height: 50, width: 100, marginLeft: 50 }} onClick={() => callapi(info)}>Submit</button>





      <div  className="cards" >
        {state.length == 0 && info !== '' ? <Loader className="loader"
          type='Oval'
          color="#00BFFF"
          height={100}
          width={100} /> : null}
        {console.log('Info', info)}
        {state.map((item, index) => (
          <Card style={{ borderRadius:15,width: 322, height: 410, margin: 30, borderColor: 'black', borderWidth: 1,  backgroundColor:'lightgreen'}}
            className="box" key={index}>
            <div className="cardinfo" style={{
              borderColor: 'black', borderWidth: 1, height: 400, width: 320, borderStyle: 'solid',
              borderRadius: 20, backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
                
              <img src='https://images.unsplash.com/photo-1535242208474-9a2793260ca8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW5lcnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' style={{ height: 300, width: 320 }}></img>
               <div className="numberinfo">
                 <div className="numinfo" id="numinfo1" ><b>Author :</b> <br/> {item.data.author}</div>
                 <div className="numinfo" id ="numinfo2">
                   <img src="https://www.pngarea.com/pngm/87/6914112_share-png-share-button-transparent-background-hd-png.png"  className="shareimg"></img>
                 </div>
                 
                </div>
               <div className="cardhover" >
              <p style={{ fontSize: 20, margin: 10, display: 'block',color:'white' }} className="line" ><b style={{ fontSize: 20, color: 'white' }}>title : </b> <br />  {item.data.title}</p>
             
              <a href={item.data.url}  className="btn"  >click</a>
              </div>
            </div>
          </Card>
        )
        )}

      </div>
      <div className="page" >
        <button onClick={() => information()}>1</button>
        <button onClick={() => secPage()}>2</button>
        <button onClick={()=>third()}>3</button>
      </div>

      <p className="number" > page no : {page}</p>
    </div>
  );
}



export default App;
