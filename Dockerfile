FROM openjdk:17

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]