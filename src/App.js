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
    let arrCopy = [...state];
    let first10 = arrCopy.map((item, index) => index < 10 && item).filter(Boolean);
    setState(first10)
  }

  function secPage(){
    let arrCopy = [...state];
    let first10 = arrCopy.map((item, index) => ((index > 9 && index < 20) && item)).filter(Boolean);
    setState(first10)
  }
  function third(){
    let arrCopy = [...state];
    let third = arrCopy.map((item, index) => index > 19 &&  item).filter(Boolean);
    setState(third)
  }

  <Loader type="Circles" color="#00BFFF" height={80} width={80} />






  return (

    <div>


      <input value={info} onChange={onchange}
        style={{ height: 50, width: 400, margin: 50, fontSize: 20 }} />

      <button style={{ height: 50, width: 100, marginLeft: 50 }} onClick={() => callapi(info)}>Submit</button>





      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: 30, width: 2000 }} className="cards" >
        {state.length == 0 && info !== '' ? <Loader className="loader"
          type='Oval'
          color="#00BFFF"
          height={100}
          width={100} /> : null}
        {console.log('Info', info)}
        {state.map((item, index) => (
          <Card style={{ width: 400, height: 450, margin: 30, borderColor: 'black', borderWidth: 1, padding: 32, }}
            className="box" key={index}>
            <div style={{
              borderColor: 'black', borderWidth: 1, height: 400, width: 320, borderStyle: 'solid',
              borderRadius: 4, backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>

              <img src='https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=332&q=80' style={{ height: 200, width: 320 }}></img>
              <p style={{ fontSize: 20, margin: 10, display: 'block' }} className="line" ><b style={{ fontSize: 20, color: 'black' }}>title : </b> <br />  {item.data.title}</p>
              <p>{index}</p>
              <button className="btn" style={{ height: 40, width: 100, margin: 10, backgroundColor: 'steelblue', borderRadius: 2, borderColor: 'black', borderWidth: 1, borderStyle: 'solid', color: 'white', fontSize: 15 }} ><a href={item.data.url}></a>click</button>

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


    </div>
  );
}



export default App;
