import logo from './logo.svg';
import './App.css';
import {card, useEffect, useState} from  'react'
import { map } from 'async';
import '@progress/kendo-theme-default/dist/all.css';
import {Card} from "@progress/kendo-react-layout";

function App() {
  const [state,setState]=useState()

  useEffect(()=>{callapi()},[])
  const callapi=async()=>{
    fetch('http://www.reddit.com/search.json?q=burger&sort=relevance&limit=25').then((res)=>{
      return res.json()
    }).then((data)=>{
      console.log(data, 'Show data')
      setState(data.data.children)
    }).catch((err)=>{
      console.log(err)
    })
  }

console.log('state  :',state)
 return(
   <div>
    
{state && state.map((el,i)=>{
  return(
    <Card style={{width:400,height:430,margin:50,borderColor:'black',borderWidth:1,padding:15,display:'inline-flex',flexWrap:'wrap',boxSizing:'border-box'}}>
    {
      state && 
       (<div>
         <p style={{fontSize:15}}>title :    {state[i].data.title}</p>
           <p>image :    <img src='https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=332&q=80' style={{height:200,width:300}}></img></p>
         <div style={{display:'inline'}}>
         <button style={{height:40,width:70}} ></button><p>{state[1].data.url}</p>   
         </div>
         
       </div>)
    }
  </Card>
  )
})}

     
    
   </div>
 );
 }
export default App;
