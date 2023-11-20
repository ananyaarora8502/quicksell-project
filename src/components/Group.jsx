import React from 'react'

const Group = ({ details, users, groupBy }) => {
    return (
        <div>
            {details.map((detail) => {
                const user = users.find((user) => { return user.id === detail.userId });
                return (
                    <div className='employee-card'>
                        <div className='employee-card-header'>
                            <div>
                                <h5 className='employee-id'>{detail.id}</h5>
                            </div>
                            <div>
                                <div style={{ position: "relative" }}>
                                    <img src={require(`../images/${user.id}.png`)} className="user-img" alt="" />
                                    <img src={require(`../images/${user.available ? 'online.png' : 'offline.png'}`)} className="available-img" alt="" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: "flex" }}>
                                {groupBy !== 'status' && <div>
                                    <img src={require(`../images/${detail.status}.png`)} className="employee-status-img" alt="" />
                                </div>}
                                <div className='px-2'>
                                    <h5 className='employee-title'>{detail.title}</h5>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='employee-card-tags'>
                                {groupBy !== 'priority' && <div className='employee-card-tag'>
                                    <img src={require(`../images/${detail.status}.png`)} className="employee-status-img" alt="" />
                                </div>}
                                {detail.tag.map((tag) => {
                                    return (
                                        <div className='employee-card-tag'>
                                            <img src={require(`../images/offline.png`)} className="employee-status-img" alt="" /> {tag}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Group