import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Length, Max, Min, validateSync } from 'class-validator';

class EnvironmentVariables {
    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;

    @IsString()
    DOMAIN: string;

    @IsString()
    MONGO_LOGIN: string;

    @IsString()
    @Length(5)
    MONGO_PASSWORD: string;

    @IsString()
    MONGO_HOST: string;

    @IsNumber()
    @Min(0)
    @Max(65535)
    MONGO_PORT: number;

    @IsString()
    MONGO_AUTHDATABASE: string;

    @IsString()
    @Length(4)
    JWT_SECRET: string;

    @IsNumber()
    @Min(0)
    @Max(65535)
    POSTGRE_PORT: number;

    @IsString()
    POSTGRE_USER: string;

    @IsString()
    @Length(5)
    POSTGRE_PASSWORD: string;

    @IsString()
    POSTGRE_DB: string;

    @IsString()
    POSTGRE_HOST: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}