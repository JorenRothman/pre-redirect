FROM httpd:latest

COPY ./public-html/ /usr/local/apache2/htdocs/
COPY ./public-html/ /var/www/html/

COPY ./config/my-httpd.conf /usr/local/apache2/conf/httpd.conf

RUN mkdir -p /usr/local/apache/conf/extra/sites

COPY ./config/sites-available/*.conf /usr/local/apache2/conf/extra/sites/

COPY ./config/hosts /etc/hosts
