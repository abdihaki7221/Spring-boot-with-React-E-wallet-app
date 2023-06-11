import React from 'react'

interface props{
  text: String
}
const SideForm = ({text}:props) => {
  
  return (
    
       <div className="col-md-5 ms-1 me-3 col-register position-relative">
            <div className="text-start">
              <h5 className="mt-5">
                Lets Help You Interact With Our E-banking Service
              </h5>
            </div>
            <p className="text-secondary mt-5">
              {text}
            </p>
            <div className="card register bg-dark text-light position-absolute bottom-0 start-0 w-80 mb-5 ms-2 me-2">
              <div className="card-body">
                <h5 className="card-title">Our Reviews</h5>

                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
   
  )
}

export default SideForm
