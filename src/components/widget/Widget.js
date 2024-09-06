import React from 'react'
import './Widget.css'
import { removeWidgets } from '../../redux/slice/widgetSlice'
import { useDispatch } from 'react-redux'

const Widget = ({widget, index}) => {
  const dispatch = useDispatch();

  const handleRemove = () =>{
    dispatch(removeWidgets(index))
  }
  console.log(widget);

  return (
    <div className='widget-card'>
      <h3 className='widget-name'>{widget.name}</h3>
      <p className="widget-description">{widget.description}</p>
      <button
        className="remove-widget-btn" onClick={handleRemove}
      >
         ✖
      </button>
    </div>
  )
}

export default Widget
