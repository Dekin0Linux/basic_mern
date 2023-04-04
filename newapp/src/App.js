import './App.css';
import {useEffect,useState} from 'react'
import Card from './components/card'


function App() {
  const [nameForm,setName] = useState('');
  const [favForm,setFav] = useState('');
  const [db,setDb] = useState([]);
  const [upd,setUpd] = useState(false);
  const [btn,setBtn] = useState('Submit');
  const [upID,setupID] = useState(0);

    //deleting from DB
const deleteData = (id)=>{
  fetch(`/user/${id}`,
  {method : 'DELETE'})
  .then(()=>console.log('deleted'));
  }

    //Post to DB
 const addData = (e)=>{
  e.preventDefault();
  fetch('/user',{
    method: 'POST',
    body : JSON.stringify({
      name : nameForm,
      fav : favForm
    }),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  setName('') //setting fields back to empty
  setFav('')
 }

     //update Values to DB
  const updateData = (data)=>{
    setName(data.name);
    setFav(data.fav);
    setupID(data._id)
    setUpd(true)
    setBtn('update');

    console.log();
  }

  const update = (e) => {
    e.preventDefault();
    console.log('Updated');

    fetch(`/user/${upID}`,{
      method: 'PUT',
      body : JSON.stringify({
        name : nameForm,
        fav : favForm
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    setName('');
    setFav('')
    setupID(0);
    setUpd(false);
    setBtn('Submit');
  }

  useEffect(()=>{
    //fetching all data from the Database
    const getData = async()=>{
      const FetchData = await fetch('/user');
      const resp = await FetchData.json();
      setDb(resp)
    }
    getData();
  },[deleteData,addData]);

  return (
    <div className="App">
      <div className='jumbotron shadow p-5' >
        <h2 className='text-center fw-bolder text-success'>Dekin C.R.U.D App v1.0</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className='container mt-5'>
              {
                db.map((data => <Card key={data._id} 
                  name={data.name} fav={data.fav} 
                  del={()=>deleteData(data._id)} 
                  edit={()=>updateData(data)} 
                  date={data.updatedAt}/>))
              }
            </div>
          </div>
  
  
          <div className="col-md-6">
              <div className="my-4">
                  <form action="" className='shadow p-4 rounded' onSubmit={btn === 'update' ? update : addData }>
                  <h4 className='text-center'>Enter your name and Email</h4>
                  <input type="hidden" name="" value={upID}/>
                    <div className="form-group">
                      <label htmlFor="name">Name</label><br />
                      <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} required value={nameForm}/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Email</label><br />
                      <input type="text" className="form-control" onChange={(e)=>setFav(e.target.value)} required value={favForm}/>
                    </div>

                    <div className="form-group mt-3">
                      <input type="submit" className={`form-control btn btn-primary`} value={btn}/>
                    </div>
                  </form>
              </div>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default App;
