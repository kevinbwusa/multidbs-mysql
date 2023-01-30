package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CreditCardTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CreditCard.class);
        CreditCard creditCard1 = new CreditCard();
        creditCard1.setId(1L);
        CreditCard creditCard2 = new CreditCard();
        creditCard2.setId(creditCard1.getId());
        assertThat(creditCard1).isEqualTo(creditCard2);
        creditCard2.setId(2L);
        assertThat(creditCard1).isNotEqualTo(creditCard2);
        creditCard1.setId(null);
        assertThat(creditCard1).isNotEqualTo(creditCard2);
    }
}
