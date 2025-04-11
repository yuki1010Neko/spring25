import { useState } from 'react'
import './App.css'
import ShoppingList from './ShoppingList'

function App() {
  const [shoppingList, setShoppingList] = useState([])
  const [budget] = useState(100)

  const addItem = (event) => {
    event.preventDefault()
    let form = event.target
    let formData = new FormData(form)
    let formDataObj = Object.fromEntries(formData.entries())

    formDataObj.purchased = false
    setShoppingList([...shoppingList, formDataObj])
    form.reset()
  }

  const removeItem = (event) => {
    const name = event.target.value
    setShoppingList(shoppingList.filter(item => item.name !== name))
  }

  const totalSpent = shoppingList.reduce((acc, item) => acc + Number(item.cost), 0)
  const remainingBudget = budget - totalSpent

  return (
    <>
      <h1>Shopping List Manager</h1>
      <h2>Remaining Budget: ${remainingBudget.toFixed(2)}</h2>
      <div className='card'>
        <form onSubmit={addItem} className='flex-apart'>
          <input type="text" name="name" placeholder='Add item to list...' />
          <input type="number" name="cost" placeholder="Cost" />
          <button className='btn purple' type='submit'>Add</button>
        </form>
      </div>
      <ShoppingList shoppingList={shoppingList} removeItem={removeItem} />
    </>
  )
}

export default App
