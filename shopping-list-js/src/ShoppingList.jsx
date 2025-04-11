function ShoppingList({ shoppingList, removeItem }) {
    return (
      <>
        {shoppingList.map((val, index) => (
          <div
            className={val.purchased ? 'card flex-apart green' : 'card flex-apart'}
            key={index}
          >
            <span>{val.name} - ${val.cost}</span>
            <span>
              <button className='btn' onClick={removeItem} value={val.name}>x</button>
            </span>
          </div>
        ))}
      </>
    )
  }
  
  export default ShoppingList
  