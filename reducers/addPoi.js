export default function(savedPoi = [], action) {
    if(action.type === 'addNewPoi') {
        var temp = savedPoi;
        temp.push(action.toAdd)
        savedPoi = temp;
      return savedPoi;
    } else {
      return savedPoi;
    }
    
  }