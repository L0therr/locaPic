export default function(currentUsername = 'empty', action) {
  
    if(action.type === 'addNewUsername') {
      return action.toAdd;
    } else {
      return currentUsername;
    }
    
  }