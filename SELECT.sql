SELECT 
    u.name AS usuario_nome,
    u.email AS usuario_email,
    r.description AS papel_descricao,
    c.description AS permissao_descricao
FROM users u
INNER JOIN roles r ON u.role_id = r.id
LEFT JOIN user_claims uc ON u.id = uc.user_id
LEFT JOIN claims c ON uc.claim_id = c.id AND c.active = true
ORDER BY u.name, c.description;