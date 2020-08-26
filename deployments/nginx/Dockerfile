FROM nginx as nginxBuilderStage

COPY /config /ssl /etc/nginx/

# Generate self signed certificate for testing(for production generate valid ssl, maybe letsencrypt)
RUN apt-get install -y openssl && \
    mkdir /etc/nginx/ssl && \
    openssl req -newkey rsa:4096 \
          -x509 \
          -sha256 \
          -days 3650 \
          -nodes \
          -out /etc/nginx/ssl/self_signed.crt \
          -keyout /etc/nginx/ssl/self_signed.key \
          -subj "/C=BR/ST=STATE/L=LOCALITY/O=ORG_NAME/OU=ORG_UNITY/CN=DOMAIN"