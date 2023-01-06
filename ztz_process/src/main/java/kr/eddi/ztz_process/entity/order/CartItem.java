package kr.eddi.ztz_process.entity.order;

import jakarta.persistence.*;
import kr.eddi.ztz_process.entity.products.Product;
import lombok.*;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long CartItemNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="item_id")
    private Product product= null;

    // 상품 개수
    private int count;

}
