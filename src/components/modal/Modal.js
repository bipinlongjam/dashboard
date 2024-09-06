import React, { useEffect, useState } from 'react';
import './Modal.css';
import { useDispatch, useSelector } from 'react-redux';
import {addWidgets} from '../../redux/slice/widgetSlice'

const Modal = ({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory
}) => {
  const [checkedWidgets, setCheckedWidgets] = useState([]); 
  const [showWarning, setShowWarning] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.widgets.categories)

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory('');
      setCheckedWidgets([])
      setShowWarning(true); 
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Fetch widgets based on the selected category
  const getCategoryWidgets = (categoryName) => {
    const category = categories.find(
      (cat) => cat.name === categoryName
    );
    return category ? category.widgets : [];
  };

  // Handle checkbox selection for widgets
  const handleCheckboxChange = (widget, isChecked) => {
    if (isChecked) {
      setCheckedWidgets((prev) => [...prev, widget]); 
    } else {
      setCheckedWidgets((prev) =>
        prev.filter((w) => w.name !== widget.name) 
      );
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName)
    setShowWarning(false)
  }

  // Handle confirm action to pass selected widgets back to the Dashboard
  const handleConfirm = () => {
    if (!selectedCategory) {
      setShowWarning(true); 
      return;
    }
    if (checkedWidgets.length === 0) {
      alert('Please select at least one widget.');
      return;
    }
    // Pass selected widgets back to Dashboard
    dispatch(addWidgets({widgets:checkedWidgets, category:selectedCategory}))
    onClose();
  };

  return (
    <div className="add-widget-modal">
      <div className="modal-content">
        <div className="modal-header">
          <p>Add Widget</p>
          <div className="close-modal-btn" onClick={onClose}>
            ✖
          </div>
        </div>

        <div className="category-row">
          {categories.map((category) => (
            <li
              key={category.name}
              className={`category-item ${
                selectedCategory === category.name ? 'selected' : ''
              }`}
              onClick={() => handleCategorySelect(category.name)}
            >
              {category.name}
            </li>
          ))}
        </div>
        {showWarning && !selectedCategory && (
          <p className="warning-message">
            Please select a category before choosing widgets.
          </p>
        )}
        {/* Display widgets if a category is selected */}
        {selectedCategory && (
          <ul className="widget-list">
            {getCategoryWidgets(selectedCategory).map((widget, index) => (
              <li key={index} className="widget-item">
                <input
                  type="checkbox"
                  onChange={(e) =>
                  handleCheckboxChange(widget, e.target.checked) 
                  }
                />
                {widget.name}
              </li>
            ))}
          </ul>
        )}

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
