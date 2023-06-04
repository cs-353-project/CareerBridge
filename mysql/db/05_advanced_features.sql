delimiter //
CREATE PROCEDURE increase_view_count(IN ad_id_param INT)
BEGIN
    UPDATE JobAdvertisement
    SET view_count = view_count + 1
    WHERE ad_id = ad_id_param;
END//
delimiter ;

delimiter //
CREATE PROCEDURE increase_application_count(IN ad_id_param INT)
BEGIN
    UPDATE JobAdvertisement
    SET application_count = application_count + 1
    WHERE ad_id = ad_id_param;
END//
delimiter ;

