# immertest

## END GOAL CALL

```javascript 
updateState('address.mainStreet[1].apartment.1A.person', (draft, currentValue) => {
  //currentValue = "John Doe"
  return "Jane Doe"
})

updateState('address.mainStreet[1].apartment.1A.hobbies', (draft, currentValue) => {
  //currentValue = ['hockey']
  return "Jane Doe"
})
```
### First Goal: Log Datatype for every end node of keypath
    - action.payload[0] is the keypath

### Second Step: Come up with a way to recognize what we are doing to the end node
    - action.payload[1] is the actual payload
    - action.payload[2] is the flag ( "add" )