import logging

#funcao para chamar o logging.
def setup_logging():
    logging.basicConfig(
        #logging definido como INFO, ou seja, ele vai mostrar mensagens de INFO.
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )