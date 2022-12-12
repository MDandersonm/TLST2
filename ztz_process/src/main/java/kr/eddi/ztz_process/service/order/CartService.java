package kr.eddi.ztz_process.service.order;

import kr.eddi.ztz_process.controller.order.request.AddCartRequest;
import kr.eddi.ztz_process.controller.order.request.SelectCartItemRequest;
import kr.eddi.ztz_process.entity.order.CartItem;

import java.util.List;

public interface CartService {
    public void addCartItem(AddCartRequest addCartRequest);
    public List<CartItem> cartList(String userToken);
    public void deleteCartItem(SelectCartItemRequest selectCartItemRequest);

}
