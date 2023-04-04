const Card = ({name,fav,del,edit,date})=>{

    return(
        <div className='card border-0 shadow p-2 my-3'>
            <div className="d-flex justify-content-between">
                <div>
                    <p className='lead mt-1 fw-bold'>{name}</p>
                    <p className='lead'>{fav}</p>
                    <small className="text-muted ">Date : {date}</small>
                </div>
                <div>
                    <span className="btn btn-sm btn-info m-1" onClick={edit}>Edit</span>
                    <span className="btn btn-sm btn-danger m-1" onClick={del}>Delete</span>
                    
                </div>
               
            </div>
        </div>
    )
}

export default Card;