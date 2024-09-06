
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidgets,removeWidgets, loadWidgets,saveWidgets } from '../redux/slice/widgetSlice';
import {openModal, closeModal, setSelectedCategory} from '../redux/slice/modalSlice'
import Widget from './widget/Widget';
import './Dashboard.css';
import Modal from './modal/Modal';
import Header from './header/Header';

const Dashboard = () => {
  const dispatch = useDispatch();
  const widgets = useSelector((state) => state.widgets.widgets);
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const selectedCategory = useSelector((state) => state.modal.selectedCategory)

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWidgets, setFilteredWidgets] = useState(widgets)
 


    useEffect(() =>{
      dispatch(loadWidgets());
    },[dispatch])

    useEffect(() => {
      setFilteredWidgets(
        widgets.filter(widget =>
          Object.values(widget).some(value =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }, [searchTerm, widgets]);

  // Function to handle opening the modal
  const handleAddWidgetClick = () => {
    dispatch(openModal())
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    dispatch(closeModal());
  };

    const handleAddWidget = (selectedWidgets) => {
      dispatch(addWidgets({ widgets: selectedWidgets, category: selectedCategory }));
      dispatch(saveWidgets());
      handleModalClose();
    };

 
  const handleRemoveWidget = (index) => {
    dispatch(removeWidgets(index));
    dispatch(saveWidgets())
  };

  const handleSearch = (term) =>{
    setSearchTerm(term);
  }
  const groupWidgetsByCategory = () => {
    return filteredWidgets.reduce((acc, widget) => {
      const category = widget.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(widget);
      return acc;
    }, {});
  };

  const groupedWidgets = groupWidgetsByCategory();

    return (
      <div className="dashboard-container">
      <Header
        handleAddWidget={handleAddWidgetClick}
        handleSearch={handleSearch}
      />
      {/* Widgets Display Section */}
      {filteredWidgets.length === 0 && searchTerm ? (
        <p className='empty-state-message'>
          Widget not found. Please adjust your search criteria.
        </p>
      ) : (
        Object.keys(groupedWidgets).length === 0 ? (
          <p className='empty-state-message'>
            No widgets available. Click 'Add Widget' to get started!
          </p>
        ) : (
          Object.keys(groupedWidgets).map((category) => (
            <div key={category} className='widgets-category-row'>
              <h2 className="category-title">{category}</h2>
              <div className='widgets-section'>
                {groupedWidgets[category].map((widget, index) => (
                  <Widget
                    key={index}
                    widget={widget}
                    onRemove={() => handleRemoveWidget(index)}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))
        )
      )}
      {/* Add Widget Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => dispatch(setSelectedCategory(category))}
          onConfirm={handleAddWidget}
        />
      )}
    </div>
  );
};

export default Dashboard;
