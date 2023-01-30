package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CreditCard;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CreditCard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {}
