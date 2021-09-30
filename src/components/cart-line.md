
```jsx
import CartLine from "./cart-line"; 
    <ul id="cart-item-list" className="divide-y divide-gray-200">
        <li>
            <CartLine
                key={'item1'}
                title={'Keyboard'}
                imageUrl={"https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80&&ixlib=rb-1.2.1&&auto=format&&fit=crop&&w=40&&h=40&&q=80"}
                price={204}
                quantity={1}
                amount={204}
                onDele={() => deleLine('item1')}
            />
            <CartLine
                key={'item2'}
                title={'Table'}
                imageUrl={"https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80&&ixlib=rb-1.2.1&&auto=format&&fit=crop&&w=40&&h=40&&q=80"}
                price={709}
                quantity={1}
                amount={709}
                onDele={() => deleLine('item1')}
            />
            <CartLine
                key={'item3'}
                title={'Ball'}
                imageUrl={"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80&&ixlib=rb-1.2.1&&auto=format&&fit=crop&&w=40&&h=40&&q=80"}
                price={92}
                quantity={1}
                amount={92}
                onDele={() => deleLine('item3')}
            />
        </li>
    </ul>
```