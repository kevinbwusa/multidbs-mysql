package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CreditCard;
import com.mycompany.myapp.repository.CreditCardRepository;
import com.mycompany.myapp.service.CreditCardService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.CreditCard}.
 */
@RestController
@RequestMapping("/api")
public class CreditCardResource {

    private final Logger log = LoggerFactory.getLogger(CreditCardResource.class);

    private static final String ENTITY_NAME = "creditCard";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CreditCardService creditCardService;

    private final CreditCardRepository creditCardRepository;

    public CreditCardResource(CreditCardService creditCardService, CreditCardRepository creditCardRepository) {
        this.creditCardService = creditCardService;
        this.creditCardRepository = creditCardRepository;
    }

    /**
     * {@code POST  /credit-cards} : Create a new creditCard.
     *
     * @param creditCard the creditCard to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new creditCard, or with status {@code 400 (Bad Request)} if the creditCard has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/credit-cards")
    public ResponseEntity<CreditCard> createCreditCard(@RequestBody CreditCard creditCard) throws URISyntaxException {
        log.debug("REST request to save CreditCard : {}", creditCard);
        if (creditCard.getId() != null) {
            throw new BadRequestAlertException("A new creditCard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CreditCard result = creditCardService.save(creditCard);
        return ResponseEntity
            .created(new URI("/api/credit-cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /credit-cards/:id} : Updates an existing creditCard.
     *
     * @param id the id of the creditCard to save.
     * @param creditCard the creditCard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated creditCard,
     * or with status {@code 400 (Bad Request)} if the creditCard is not valid,
     * or with status {@code 500 (Internal Server Error)} if the creditCard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/credit-cards/{id}")
    public ResponseEntity<CreditCard> updateCreditCard(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CreditCard creditCard
    ) throws URISyntaxException {
        log.debug("REST request to update CreditCard : {}, {}", id, creditCard);
        if (creditCard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, creditCard.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!creditCardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CreditCard result = creditCardService.save(creditCard);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, creditCard.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /credit-cards/:id} : Partial updates given fields of an existing creditCard, field will ignore if it is null
     *
     * @param id the id of the creditCard to save.
     * @param creditCard the creditCard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated creditCard,
     * or with status {@code 400 (Bad Request)} if the creditCard is not valid,
     * or with status {@code 404 (Not Found)} if the creditCard is not found,
     * or with status {@code 500 (Internal Server Error)} if the creditCard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/credit-cards/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CreditCard> partialUpdateCreditCard(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CreditCard creditCard
    ) throws URISyntaxException {
        log.debug("REST request to partial update CreditCard partially : {}, {}", id, creditCard);
        if (creditCard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, creditCard.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!creditCardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CreditCard> result = creditCardService.partialUpdate(creditCard);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, creditCard.getId().toString())
        );
    }

    /**
     * {@code GET  /credit-cards} : get all the creditCards.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of creditCards in body.
     */
    @GetMapping("/credit-cards")
    public List<CreditCard> getAllCreditCards() {
        log.debug("REST request to get all CreditCards");
        return creditCardService.findAll();
    }

    /**
     * {@code GET  /credit-cards/:id} : get the "id" creditCard.
     *
     * @param id the id of the creditCard to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the creditCard, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/credit-cards/{id}")
    public ResponseEntity<CreditCard> getCreditCard(@PathVariable Long id) {
        log.debug("REST request to get CreditCard : {}", id);
        Optional<CreditCard> creditCard = creditCardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(creditCard);
    }

    /**
     * {@code DELETE  /credit-cards/:id} : delete the "id" creditCard.
     *
     * @param id the id of the creditCard to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/credit-cards/{id}")
    public ResponseEntity<Void> deleteCreditCard(@PathVariable Long id) {
        log.debug("REST request to delete CreditCard : {}", id);
        creditCardService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
