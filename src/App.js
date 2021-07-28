import React,{useState,useRef,useEffect} from 'react';
import './index.css';



const getLocalData=()=>{
  const list = localStorage.getItem("todoapp");
  if(list){
    return JSON.parse(list);
  }
  else{
    return [];
  }
};

const App=() =>{
  const [inputList, setInputList] = useState("");
  const [items,setItems] = useState(getLocalData());
  const [isEditItem,setIsEditItem] = useState("");
  const [toggleBtn,setToggleBtn] = useState(false);

  const dummy = useRef(null);
  const itemEvent = (event)=>{
    setInputList(event.target.value);
  }
  const listOfItem =()=>{
    if(inputList===''){
      // alert("ENTER AN ITEM");
      return undefined;
    }
    else if(inputList && toggleBtn){
      setItems(
        items.map((currElem)=>{
          if(currElem.id === isEditItem){
            return{ ...currElem,name:inputList}
          }
          return currElem;
        })
      )
      setInputList("");
      setIsEditItem(null);
      setToggleBtn(false);
    }
    else{
      const myNewInputData= {
        id : new Date().getTime().toString(),
        name: inputList,
      };
      setItems((oldItems)=>{
      return [...oldItems,myNewInputData];
      });
      setInputList("");
      dummy.current.scrollIntoView({ behavior: 'smooth',block: 'end'});
    }
  }
  const editItem = (index) =>{
     const item_todo_edited = items.find((currElem)=>{
       return currElem.id===index;
     })
     setInputList(item_todo_edited.name);
     setIsEditItem(index);
     setToggleBtn(true);
  }
  const deleteItem=(index)=>{
    const updatedItems = items.filter((currElem)=>{
      return currElem.id!==index;
    });
    setItems(updatedItems)
  };
  const deleteAll = () =>{
    setItems([]); 
  }
  // for local storage
  useEffect(()=>{localStorage.setItem ("todoapp",JSON.stringify(items))});

  return(
    <>
       <div className='main-div'>
           <div className='center-div'>
              <br/>
                <h1> ToDoList</h1>
              <br/> 
              <div className='items'>
                <input type="text" placeholder='Add an item' onChange={itemEvent} value={inputList}/>
                {toggleBtn ? (<i className="fas fa-edit add-btn"  id="i-toggleEdit" onClick={listOfItem} ></i>)
                :(<i className="fa fa-plus add-btn" onClick={listOfItem}></i>)}
              </div>
              <ul>
                {items.map((itemVal,index)=>{
                  return(
                    <>
                    <div className='todo-style' key={itemVal.id}>
                        <li key={itemVal.id}> {itemVal.name}</li>
                        <i className="fas fa-edit"  id="i-edit" onClick= {()=> editItem(itemVal.id)} ></i>
                        <i className='far fa-trash-alt add-btn' id="i-red" aria-hidden="true" onClick={()=>deleteItem(itemVal.id)}></i>
                    </div>
                    </>
                  );
                })}
                <div className="dummy" ref={dummy}/>
              </ul>
              <div className="button_add">
              <button className="btn2" onClick={deleteAll}>Remove all</button>
              </div>
           </div>
       </div>

    </>
  );
}

export default App;
