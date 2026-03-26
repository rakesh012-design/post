
const Pager = ({changePageNumber,pageNum}) => {
  return (
    <div>
      <nav aria-label="Page navigation example">
    <ul class="pagination">
    <li class="page-item"><button onClick={()=>changePageNumber(Number(pageNum)-1)}   class="page-link" >Previous</button></li>
    <li class="page-item"><button class="page-link"  onClick={()=>changePageNumber(1)} >{pageNum}</button></li>
    {/*<li class="page-item"><button class="page-link"  onClick={()=>changePageNumber(2)} >2</button></li>
    <li class="page-item"><button class="page-link"  onClick={()=>changePageNumber(3)} >3</button></li>*/}
    <li class="page-item"><button class="page-link"  onClick={()=>changePageNumber(Number(pageNum)+1)} >Next</button></li>
  </ul>
</nav>
    </div>
  )
}

export default Pager
