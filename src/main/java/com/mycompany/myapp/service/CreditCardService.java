package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.CreditCard;
import com.mycompany.myapp.repository.CreditCardRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link CreditCard}.
 */
@Service
@Transactional
public class CreditCardService {

    private final Logger log = LoggerFactory.getLogger(CreditCardService.class);

    private final CreditCardRepository creditCardRepository;

    public CreditCardService(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    /**
     * Save a creditCard.
     *
     * @param creditCard the entity to save.
     * @return the persisted entity.
     */
    public CreditCard save(CreditCard creditCard) {
        log.debug("Request to save CreditCard : {}", creditCard);
        return creditCardRepository.save(creditCard);
    }

    /**
     * Partially update a creditCard.
     *
     * @param creditCard the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CreditCard> partialUpdate(CreditCard creditCard) {
        log.debug("Request to partially update CreditCard : {}", creditCard);

        return creditCardRepository
            .findById(creditCard.getId())
            .map(existingCreditCard -> {
                if (creditCard.getType() != null) {
                    existingCreditCard.setType(creditCard.getType());
                }
                if (creditCard.getNumber() != null) {
                    existingCreditCard.setNumber(creditCard.getNumber());
                }

                return existingCreditCard;
            })
            .map(creditCardRepository::save);
    }

    /**
     * Get all the creditCards.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CreditCard> findAll() {
        log.debug("Request to get all CreditCards");
        return creditCardRepository.findAll();
    }

    /**
     * Get one creditCard by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CreditCard> findOne(Long id) {
        log.debug("Request to get CreditCard : {}", id);
        return creditCardRepository.findById(id);
    }

    /**
     * Delete the creditCard by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CreditCard : {}", id);
        creditCardRepository.deleteById(id);
    }
}
