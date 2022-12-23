import {
    REQUEST_PRODUCTS_LIST_FROM_SPRING,
    REQUEST_FILTERED_PRODUCT_FROM_SPRING,
    REQUEST_PRODUCT_FROM_SPRING,
    RESPONSE_MY_REQUEST,
    RESPONSE_MEMBER_OBJECT,
    REQUEST_CART_LIST_FROM_SPRING,
    RESPONSE_MEMBER_PROFILE_OBJET,
    REQUEST_FOUNDRY_LIST,
    REQUEST_READ_REVIEW_FROM_SPRING,
    REQUEST_QUESTION_LIST_FROM_SPRING,
    REQUEST_QUESTION_FROM_SPRING,
    REQUEST_ALL_ORDER_LIST_FROM_SPRING,
    REQUEST_ALL_PAYMENT_FROM_SPRING, REQUEST_QUESTION_COMMENT_LIST_FROM_SPRING
} from "./mutation-types";


// npm install axios --save-dev
import axios from "axios";

export default {
    reqProductsFromSpring({commit}) {
        return axios.get('http://localhost:7777/ztz/products/list')
            .then((res) => {
                commit(REQUEST_PRODUCTS_LIST_FROM_SPRING, res.data)
                console.log(res.data)
            })
    },
    reqFilteredProductsFromSpring({commit}, localName) {
        return axios.get(`http://localhost:7777/ztz/products/list/${localName}`)
            .then((res) => {
                commit(REQUEST_FILTERED_PRODUCT_FROM_SPRING, res.data)
            })
    },
    requestProductFromSpring({commit}, productNo) {
        console.log('productDetailView - product 가져오기' + productNo)

        return axios.post(`http://localhost:7777/ztz/products/list/product/${productNo}`)
            .then((res) => {
                commit(REQUEST_PRODUCT_FROM_SPRING, res.data)
            })
    },
    reqDeleteMemberToSpring({commit}, token) {
        return axios.delete('http://localhost:7777/ztz/member/withdrawal', {
            headers: {token: token}
        }).then((res) => {
            commit(RESPONSE_MY_REQUEST, res.data)
        })
    },
    reqMemberInfoToSpring({commit}, token) {
        return axios.post(`http://localhost:7777/ztz/member/user-verification`,
            {token: token})
            .then((res) => {
                commit(RESPONSE_MEMBER_OBJECT, res.data)
                console.log("actions :" + res.data)
            })
    },
    reqFoundryListFromSpring({commit}) {
        return axios.get('http://localhost:7777/ztz/tour/list')
            .then((res) => {
                commit(REQUEST_FOUNDRY_LIST, res.data)
                console.log(res.data)
            })
    },

    reqReservationToSpring({commit}, payload) {
        return axios.post("http://localhost:7777/ztz/tour/reservation", payload)
            .then((res) => {
                commit(RESPONSE_MY_REQUEST, res.data);
            });
    },
    reqMemberProfileInfoToSpring({commit}, token) {
        return axios.post(`http://localhost:7777/ztz/member/user-profile`,
            {token: token})
            .then((res) => {
                commit(RESPONSE_MEMBER_PROFILE_OBJET, res.data)
                console.log("profile :" + res.data)
            })
    },

    // eslint-disable-next-line no-empty-pattern
    reqAddCartToSpring({}, payload) {
        const {memberId, productId, count} = payload
        console.log('장바구니 추가 상품번호: ' + productId + ' 수량: ' + count)

        return axios.post(`http://localhost:7777/ztz/order/addCartItem/${memberId}`,
            {memberId, productId, count})
            .then(() => {
            })
    },
    reqCartListFromSpring({commit}, token) {
        return axios.post('http://localhost:7777/ztz/order/cartList',
            {token: token})
            .then((res) => {
                commit(REQUEST_CART_LIST_FROM_SPRING, res.data)
                console.log("장바구니 리스트 출력")
            })
    },
    // eslint-disable-next-line no-empty-pattern
    reqDeleteCartItemFromSpring({}, payload) {
        const selectCartItemNo = payload

        console.log('장바구니 아이템 삭제 전')

        return axios.post(`http://localhost:7777/ztz/order/deleteCartItem`,
            {selectCartItemNo})
            .then(() => {
            })
    },
    reqRegisterReviewToSpring(_, payload) {
        console.log('이미지 미포함 리뷰 등록하기')

        return axios.post('http://localhost:7777/ztz/products/review/register', payload)
            .then(() => {
            })
    },
    reqRegisterReviewWithImageToSpring(_, payload) {
        console.log("이미지 포함 리뷰 등록하기")

        return axios.post('http://localhost:7777/ztz/products/review/registerWithImg', payload)
            .then((res) => {
                console.log(res.data)
            })
            .catch((res) => {
                console.log(res.message)
            })
    },
    reqReadReviewFromSpring({commit}, productNo) {
        console.log(productNo + '번 상품의 리뷰 가져오기')

        return axios.post(`http://localhost:7777/ztz/products/review/read/${productNo}`)
            .then((res) => {
                commit(REQUEST_READ_REVIEW_FROM_SPRING, res.data)
            })
    },
    reqMyPageReviewFromSpring({commit}, memberId) {
        console.log('멤버' + memberId + '번의 리뷰 불러오기')

        return axios.post(`http://localhost:7777/ztz/products/review/read/myPage/${memberId}`)
            .then((res) => {
                commit(REQUEST_READ_REVIEW_FROM_SPRING, res.data)
            })
    },
    // 질문게시판 리스트 UI
    requestQuestionListFromSpring({commit}) {
        console.log('requestQuestionListFromSpring()')

        return axios.get('http://localhost:7777/ztz/boards/question/list')
            .then((res) => {
                commit(REQUEST_QUESTION_LIST_FROM_SPRING, res.data)
            })
    },

    // 질문게시판 조회(읽기)
    requestQuestionFromSpring({commit}, questionNo) {
        console.log('requestQuestionFromSpring()')
        return axios.get(`http://localhost:7777/ztz/boards/question/${questionNo}`)
            .then((res) => {
                commit(REQUEST_QUESTION_FROM_SPRING, res.data)
            })
    },

    // 질문게시판 등록
    // eslint-disable-next-line no-empty-pattern
    requestCreateQuestionContentsToSpring({}, payload) {
        console.log('requestCreateQuestionContentsToSpring()')
        const {title, content, writer} = payload
        return axios.post('http://localhost:7777/ztz/boards/question/register',
            {title, content, writer})
            .then(() => {
                alert('등록 완료했습니다!')
            })
    },

    // 질문게시판 수정
    // eslint-disable-next-line no-empty-pattern
    requestQuestionModifyToSpring({}, payload) {
        console.log('requestQuestionModifyToSpring()')

        const {title, content, questionNo, writer, regDate} = payload

        return axios.put(`http://localhost:7777/ztz/boards/question/${questionNo}`,
            {title, content, writer, regDate})
            .then(() => {
                alert('수정 완료했습니다!')
            })
    },

    // 질문게시판 삭제
    // eslint-disable-next-line no-empty-pattern
    requestDeleteQuestionToSpring({}, questionNo) {
        console.log('requestDeleteQuestionToSpring()')

        return axios.delete(`http://localhost:7777/ztz/boards/question/${questionNo}`)
            .then(() => {
                alert('삭제 완료했습니다!')
            })
    },

    // 댓글 리스트 UI
    requestQuestionCommentListFromSpring ({ commit }, questionNo) {
        console.log('requestQuestionCommentListFromSpring()')

        return axios.get(`http://localhost:7777/ztz/boards/question/comment/${questionNo}`)
            .then((res) => {
                commit(REQUEST_QUESTION_COMMENT_LIST_FROM_SPRING, res.data)
            })
    },

    // 댓글 리스트 등록 // 메소드 만들기
    // eslint-disable-next-line no-empty-pattern
    requestQuestionCommentRegisterToSpring ({ }, payload) {
        console.log('requestQuestionCommentRegisterToSpring()') // F12 콘솔에서 잘 실행했니?
        const { comment, commentWriter, questionNo, userNumber } = payload // 공간에서 빼와서 사용
        console.log("댓글 등록" + questionNo)
        return axios.post('http://localhost:7777/ztz/boards/question/comment/register', // 스프링쪽으로 통신
            { comment : comment, commentWriter: commentWriter, question_no : questionNo, member_no : userNumber })
            // 왼쪽은 스프링 변수명 : 오른쪽은 뷰 변수명
            .then(() => {
                alert('댓글 등록 성공')
            })
    },
    // 댓글 삭제
    // eslint-disable-next-line no-empty-pattern
    requestDeleteQuestionCommentToSpring({}, questionCommentNo) {
        console.log('requestDeleteQuestionToSpring()')

        return axios.delete(`http://localhost:7777/ztz/boards/question/comment/${questionCommentNo}`)
            .then(() => {
                alert('삭제 완료했습니다!')
            })
    },

    reqDeleteReviewToSpring(_, reviewNo) {
        console.log(reviewNo + "번 리뷰 삭제")

        return axios.delete(`http://localhost:7777/ztz/products/review/delete/${reviewNo}`)
            .then(() => {
                alert('삭제 완료했습니다.')
            })
    },
    reqModifyReviewToSpring(_, payload) {
        console.log('이미지 없는 리뷰 수정')

        const {reviewNo, rate, content} = payload

        return axios.put(`http://localhost:7777/ztz/products/review/modify/${reviewNo}`,
            {rate, content})
            .then(() => {
                alert('리뷰를 수정했습니다.')
            })
    },
    reqModifyReviewWithImgToSpring(_, payload) {
        console.log('이미지 포함 리뷰 수정')

        const {formData, reviewNo} = payload
        console.log(formData)

        return axios.put(`http://localhost:7777/ztz/products/review/modifyWithImg/${reviewNo}`, formData)
            .then((res) => {
                console.log(res.data)
                alert('리뷰를 수정했습니다.')
            })
            .catch((res) => {
                console.log(res.message)
            })
    },
    reqOrderedListFromSpring({commit}, paymentId) {
        return axios.post(`http://localhost:7777/ztz/order/ReadAllOrder/${paymentId}`)
            .then((res) => {
                commit(REQUEST_ALL_ORDER_LIST_FROM_SPRING, res.data)
                console.log("reqOrderedListFromSpring : " + res.data)
            })
    },

    reqPaymentListFromSpring({commit}, token) {
        return axios.post(`http://localhost:7777/ztz/order/ReadAllPayment`,
            {token: token})
            .then((res) => {
                commit(REQUEST_ALL_PAYMENT_FROM_SPRING, res.data)
            })
    },
    // eslint-disable-next-line no-empty-pattern
    reqRefundAllOrderToSpring({}, payload) {
        const {refundPaymentId, refundReason} = payload
        return axios.post(`http://localhost:7777/ztz/order/refundAllOrder/${refundPaymentId}`, {
            refundPaymentId,
            refundReason
        })
            .then((res) => {
                console.log(res)
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestDeleteProductToSpring ({ }, productNo) {
        console.log('상품 삭제()')

        return axios.delete(`http://localhost:7777/ztz/products/${productNo}`)
            .then(() => {
                alert('상품이 삭제되었습니다.')
            })
    },

    // eslint-disable-next-line no-empty-pattern
    reqRegisterOrderToSpring({}, payload){
        const { paymentPrice, merchant_uid , sendInfo , imp_uid, city, street, addressDetail, zipcode ,sendRequest} = payload
        return axios.post(`http://localhost:7777/ztz/order/OrderRegister`,
            {paymentPrice, merchant_uid , sendInfo , imp_uid, city, street, addressDetail, zipcode ,sendRequest})

            .then((res) => {
                console.log(res)
            })
    },
}
