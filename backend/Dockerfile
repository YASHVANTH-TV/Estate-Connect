# Stage 1: build the Spring Boot JAR
FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /app

# Copy project files
COPY . .

# Build JAR (Angular files already in src/main/resources/static)
RUN mvn clean package -DskipTests

# Stage 2: runtime
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy JAR from build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
