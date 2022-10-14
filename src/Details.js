function Details(props) {
    return (
        <details>
            <summary className="toggle">상세정보</summary>
            <div>
                {props.item.completed ? <p>상태: 완료</p> : <p>상태: 미완료</p>}
                <p>
                    등록일: {props.item.createdAt}
                </p>
                <div>
                    마감일: <input type="date" value={props.item.endsAt} onChange={(e) => { props.handleDateChange(props.index, props.item.id, e); }} />
                </div>
            </div>
        </details>
    )
}

export default Details;