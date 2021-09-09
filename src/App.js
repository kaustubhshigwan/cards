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
import Wrappedcomponent from './components/wrappedcomponent';
import DisplayCard from './components/displayCard';
function App() {
  const [state, setState] = useState([])
  const [originalData, changeOGData] = useState([])
  const [info, setInfo] = useState('')
  const [change, setChange] = useState(undefined)
  const [page, setPage] = useState('')
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
    document.getElementById('num').style.display='block'
    setTimeout(()=>{
      document.getElementById('num').style.display='none'
    },4000)

  }

  function secPage() {
    let arrCopy = [...originalData];
    let first10 = arrCopy.map((item, index) => ((index > 9 && index < 20) && item)).filter(Boolean);
    setState(first10)
    setPage(2)
    document.getElementById('num').style.display='block'
    setTimeout(()=>{
      document.getElementById('num').style.display='none'
    },4000)
  }
  function third() {
    let arrCopy = [...originalData];
    let third = arrCopy.map((item, index) => index > 19 && item).filter(Boolean);
    setState(third)
    setPage(3)
    document.getElementById('num').style.display='block'
    setTimeout(()=>{
      document.getElementById('num').style.display='none'
    },4000)
  }

  <Loader type="Circles" color="#00BFFF" height={80} width={80} />

   





  return (

    <div>


      <input value={info} onChange={onchange}
        className="input" />

      <button className="submit" onClick={() => callapi(info)}>Submit</button>





      <div className="cards" >
        {state.length == 0 && info !== '' ? <Loader className="loader"
          type='Oval'
          color="#00BFFF"
          height={100}
          width={100} /> : null}
        {console.log('Info', info)}

        
        {state.map((item, index) => (
          
         <DisplayCard data={item} index={index} />
           
        )
        )}

      </div>
      <div className="page">
        <button onClick={() => information()}>1</button>
        <button onClick={() => secPage()}>2</button>
        <button onClick={() => third()}>3</button>
      </div>

      <div className="number"    >page:
         <div className="num" id="num">{page}</div>
      </div>
    </div>
  );
}





export default App;
