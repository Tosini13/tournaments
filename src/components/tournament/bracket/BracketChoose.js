import React from 'react'

const BracketChoose = (props) => {

    const { list, chosenItems } = props;
    return (
        <div className='bracket-choose-list'>
            {list.map((item) => {
                const order = chosenItems.findIndex(id => id === item.id);
                return (
                    <div key={item.id} className='bracket-choose' onClick={() => { props.handleChooseTeam(item.id) }}>
                        <p className='bracket-choose-title'>{item.name}</p>
                        {order > -1 ? <span className='bracket-choose-order'>{order + 1}</span> : null}
                    </div>
                )
            })}
        </div>
    )
}

export default BracketChoose;