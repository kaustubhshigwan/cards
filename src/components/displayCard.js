import React from 'react'
import { Card } from "@progress/kendo-react-layout";
function DisplayCard(props) {
    console.log(props)
    return (
        <div>
           <Card style={{ margin: 30 }}
            className="box" key={props.index}>
            <div className="cardinfo" style={{
              display: 'flex'
            }}>

              <img src='https://images.unsplash.com/photo-1535242208474-9a2793260ca8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW5lcnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' style={{ height: 300, width: 320 }}></img>
              <div className="numberinfo">
                <div className="numinfo" id="numinfo1" ><b>Title :</b> <br/> {props.data.data.title}</div>
                <div className="numinfo" id="numinfo2">
                  <img src="https://www.pngarea.com/pngm/87/6914112_share-png-share-button-transparent-background-hd-png.png" className="shareimg"></img>
                </div>

              </div>
              <div className="cardhover" >
                <p style={{ fontSize: 20, margin: 10, display: 'block', color: 'white' }} className="line" ><b style={{ fontSize: 20, color: 'white' }}>Author : </b> <br />  {props.data.data.author}</p>

                <a href={props.data.data.url} className="btn"  >click</a>
              </div>
            </div>
          </Card>
        </div>
    )
}

export default DisplayCard
